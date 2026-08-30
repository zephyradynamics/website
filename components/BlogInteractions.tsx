'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Bookmark, Heart, MessageCircle, Send } from 'lucide-react';

interface Comment {
  name: string;
  message: string;
}

interface StoredInteractions {
  liked: boolean;
  likes: number;
  shares: number;
  saved: boolean;
  comments: Comment[];
}

interface BlogInteractionsProps {
  articlePath: string;
  title: string;
}

const emptyInteractions: StoredInteractions = {
  liked: false,
  likes: 0,
  shares: 0,
  saved: false,
  comments: [],
};

export default function BlogInteractions({ articlePath, title }: BlogInteractionsProps) {
  const storageKey = `zephyra-blog:v2:${articlePath}`;
  const articleUrl = `https://www.zephyradynamics.com${articlePath}`;
  const shareMenuRef = useRef<HTMLDivElement | null>(null);
  const [interactions, setInteractions] = useState<StoredInteractions>(emptyInteractions);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as StoredInteractions;
        queueMicrotask(() => {
          if (active) setInteractions(parsed);
        });
      }
    } catch {
      // Keep the controls usable when browser storage is unavailable.
    }
    return () => {
      active = false;
    };
  }, [storageKey]);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener('mousedown', closeMenu);
    return () => document.removeEventListener('mousedown', closeMenu);
  }, []);

  const persist = (next: StoredInteractions) => {
    setInteractions(next);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      // The current session still works without persistence.
    }
  };

  const toggleLike = () => {
    persist({
      ...interactions,
      liked: !interactions.liked,
      likes: Math.max(0, interactions.likes + (interactions.liked ? -1 : 1)),
    });
  };

  const toggleSaved = () => persist({ ...interactions, saved: !interactions.saved });

  const countShare = () => {
    persist({ ...interactions, shares: interactions.shares + 1 });
    setShareOpen(false);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    countShare();
    setTimeout(() => setCopied(false), 2000);
  };

  const openNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url: articleUrl });
      countShare();
    } else {
      await copyLink();
    }
  };

  const submitComment = (event: FormEvent) => {
    event.preventDefault();
    const cleanName = name.trim();
    const cleanMessage = message.trim();
    if (!cleanName || !cleanMessage) return;

    persist({
      ...interactions,
      comments: [...interactions.comments, { name: cleanName, message: cleanMessage }],
    });
    setName('');
    setMessage('');
  };

  const shareLinks = [
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
    },
    {
      label: 'X',
      href: `https://x.com/intent/post?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(title)}`,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${articleUrl}`)}`,
    },
  ];

  return (
    <div className="mt-7 border-t border-rule pt-5">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-5 sm:gap-7">
          <button
            type="button"
            onClick={toggleLike}
            aria-label={interactions.liked ? 'Unlike this article' : 'Like this article'}
            aria-pressed={interactions.liked}
            className={`flex items-center gap-2 text-sm transition-colors ${interactions.liked ? 'text-signal' : 'text-ink hover:text-signal'}`}
          >
            <Heart size={23} fill={interactions.liked ? 'currentColor' : 'none'} aria-hidden="true" />
            <span>{interactions.likes}</span>
          </button>

          <button
            type="button"
            onClick={() => setCommentsOpen((open) => !open)}
            aria-label="Show comments"
            aria-expanded={commentsOpen}
            className="flex items-center gap-2 text-sm text-ink transition-colors hover:text-signal"
          >
            <MessageCircle size={23} aria-hidden="true" />
            <span>{interactions.comments.length}</span>
          </button>

          <div ref={shareMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setShareOpen((open) => !open)}
              aria-label="Share this article"
              aria-expanded={shareOpen}
              className="flex items-center gap-2 text-sm text-ink transition-colors hover:text-signal"
            >
              <Send size={23} aria-hidden="true" />
              <span>{interactions.shares}</span>
            </button>

            {shareOpen && (
              <div className="absolute top-[calc(100%+12px)] left-0 z-20 w-52 border border-rule-strong bg-plate py-2 shadow-xl">
                {shareLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={countShare}
                    className="block px-4 py-2.5 text-sm text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={openNativeShare}
                  className="block w-full px-4 py-2.5 text-left text-sm text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
                >
                  More apps
                </button>
                <button
                  type="button"
                  onClick={copyLink}
                  className="block w-full px-4 py-2.5 text-left text-sm text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
                >
                  {copied ? 'Link copied' : 'Copy link'}
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={toggleSaved}
          aria-label={interactions.saved ? 'Remove saved article' : 'Save this article'}
          aria-pressed={interactions.saved}
          className={`transition-colors ${interactions.saved ? 'text-signal' : 'text-ink hover:text-signal'}`}
        >
          <Bookmark size={23} fill={interactions.saved ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
      </div>

      <p className="mt-4 text-xs text-ink-muted">
        {interactions.likes} {interactions.likes === 1 ? 'like' : 'likes'} ·{' '}
        {interactions.comments.length} {interactions.comments.length === 1 ? 'comment' : 'comments'} ·{' '}
        {interactions.shares} {interactions.shares === 1 ? 'share' : 'shares'}
      </p>

      {commentsOpen && (
        <div className="mt-5 border-t border-rule pt-5">
          {interactions.comments.length > 0 && (
            <div className="mb-6 space-y-4">
              {interactions.comments.map((comment, index) => (
                <div key={`${comment.name}-${index}`} className="text-sm leading-relaxed">
                  <span className="font-medium text-ink">{comment.name}</span>{' '}
                  <span className="text-ink-soft">{comment.message}</span>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={submitComment} className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              aria-label="Your name"
              required
              className="h-10 border-0 border-b border-field bg-transparent text-sm text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none"
            />
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Add a comment"
                aria-label="Comment"
                required
                className="h-10 min-w-0 flex-1 border-0 border-b border-field bg-transparent text-sm text-ink placeholder:text-ink-faint focus:border-signal focus:outline-none"
              />
              <button type="submit" className="text-sm font-medium text-signal hover:text-signal-dark">
                Post
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
