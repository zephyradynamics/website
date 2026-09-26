import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface Comment {
  name: string;
  message: string;
}

interface ArticleInteractions {
  likes: number;
  shares: number;
  comments: Comment[];
}

type InteractionStore = Record<string, ArticleInteractions>;

const allowedArticles = new Set([
  '/blogs/uam-fundamentals-india',
  '/blogs/zephyra-vision',
  '/blogs/flightlab',
]);

const dataFile = path.join(process.cwd(), 'data', 'blog-interactions.json');
let writeQueue: Promise<void> = Promise.resolve();

const emptyArticle = (): ArticleInteractions => ({ likes: 0, shares: 0, comments: [] });

async function readStore(): Promise<InteractionStore> {
  try {
    return JSON.parse(await fs.readFile(dataFile, 'utf8')) as InteractionStore;
  } catch {
    return {};
  }
}

async function updateArticle(
  articlePath: string,
  update: (current: ArticleInteractions) => ArticleInteractions,
) {
  let result = emptyArticle();
  writeQueue = writeQueue.catch(() => undefined).then(async () => {
    const store = await readStore();
    result = update(store[articlePath] ?? emptyArticle());
    store[articlePath] = result;
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, `${JSON.stringify(store, null, 2)}\n`, 'utf8');
  });
  await writeQueue;
  return result;
}

export async function GET(request: NextRequest) {
  const articlePath = request.nextUrl.searchParams.get('articlePath') ?? '';
  if (!allowedArticles.has(articlePath)) {
    return NextResponse.json({ error: 'Unknown article.' }, { status: 400 });
  }

  await writeQueue;
  const store = await readStore();
  return NextResponse.json(store[articlePath] ?? emptyArticle());
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    articlePath?: string;
    action?: 'like' | 'share' | 'comment';
    delta?: number;
    name?: string;
    message?: string;
  };
  const articlePath = body.articlePath ?? '';
  if (!allowedArticles.has(articlePath)) {
    return NextResponse.json({ error: 'Unknown article.' }, { status: 400 });
  }

  const updated = await updateArticle(articlePath, (current) => {
    if (body.action === 'like') {
      const delta = body.delta === -1 ? -1 : 1;
      return { ...current, likes: Math.max(0, current.likes + delta) };
    }
    if (body.action === 'share') {
      return { ...current, shares: current.shares + 1 };
    }
    if (body.action === 'comment') {
      const name = body.name?.trim().slice(0, 60) ?? '';
      const message = body.message?.trim().slice(0, 500) ?? '';
      if (!name || !message) return current;
      return { ...current, comments: [...current.comments, { name, message }] };
    }
    return current;
  });

  return NextResponse.json(updated);
}
