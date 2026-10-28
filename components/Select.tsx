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

  const openList = useCallback(() => {
    setActiveIndex(Math.max(0, options.indexOf(value)));
    setOpen(true);
  }, [options, value]);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

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
        if (!open) openList();
        else setActiveIndex((i) => (i + 1) % options.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!open) openList();
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
        if (!open) openList();
        else pick(options[activeIndex]);
        break;
      case 'Tab':
        if (open) setOpen(false);
        break;
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <span id={`${id}-label`} className="mb-2 block text-[13px] font-medium text-slate">
        {label}
      </span>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        className="flex h-12 w-full items-center justify-between rounded-xl bg-cloud px-4 text-left text-base text-carbon ring-1 ring-line transition-shadow focus:ring-2 focus:ring-kestrel focus:outline-none"
      >
        <span id={`${id}-value`}>{value}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`text-slate transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
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
          className="absolute top-[calc(100%+6px)] left-0 z-30 w-full overflow-hidden rounded-xl bg-cloud py-1 shadow-[0_20px_40px_-20px_rgba(21,25,29,0.35)] ring-1 ring-line focus:outline-none"
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
                  active ? 'bg-mist' : ''
                } ${selected ? 'font-semibold text-kestrel' : 'text-carbon'}`}
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
