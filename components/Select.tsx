'use client';

import { useState, useRef, useEffect, useId, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (name: string, value: string) => void;
}

/**
 * A listbox that replaces the native <select>.
 * A native select paints its option list with the operating system's own
 * highlight colour, which cannot be restyled. This renders the list itself so
 * it follows the site palette.
 */
export default function Select({ label, name, value, options, onChange }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, options.indexOf(value)));

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const id = useId();

  const close = useCallback((refocus = true) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  }, []);

  const pick = useCallback(
    (option: string) => {
      onChange(name, option);
      close();
    },
    [name, onChange, close]
  );

  useEffect(() => {
    if (!open) return;
    setActiveIndex(Math.max(0, options.indexOf(value)));
    const onClickOutside = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open, options, value]);

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!open) setOpen(true);
        else setActiveIndex((i) => (i + 1) % options.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!open) setOpen(true);
        else setActiveIndex((i) => (i - 1 + options.length) % options.length);
        break;
      case 'Home':
        if (open) { event.preventDefault(); setActiveIndex(0); }
        break;
      case 'End':
        if (open) { event.preventDefault(); setActiveIndex(options.length - 1); }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (!open) setOpen(true);
        else pick(options[activeIndex]);
        break;
      case 'Tab':
        if (open) setOpen(false);
        break;
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <span id={`${id}-label`} className="meta mb-2 block">
        {label}
      </span>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        className="flex h-11 w-full items-center justify-between border-b border-field bg-transparent text-left text-base text-ink transition-colors hover:border-ink-muted focus:border-signal focus:outline-none"
      >
        <span id={`${id}-value`}>{value}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`text-ink-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={`${id}-opt-${activeIndex}`}
          onKeyDown={onKeyDown}
          className="absolute top-[calc(100%+4px)] left-0 z-30 w-full border border-rule bg-plate py-1 focus:outline-none"
        >
          {options.map((option, index) => {
            const selected = option === value;
            const active = index === activeIndex;
            return (
              <li
                key={option}
                id={`${id}-opt-${index}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(option)}
                className={`cursor-pointer px-4 py-2.5 text-[15px] transition-colors ${
                  active ? 'bg-canvas' : ''
                } ${selected ? 'font-medium text-signal' : 'text-ink-soft'}`}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
