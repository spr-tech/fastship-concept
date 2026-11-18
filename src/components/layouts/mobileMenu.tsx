"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/ui/button/button";
import { ArrowRightIcon, CloseIcon, MenuIcon } from "@/components/ui/icons/icons";
import type { Navigation } from "@/models/navigation";
import { cn } from "@/utilities/helpers/cn";

type MobileMenuProps = {
  navigation: Navigation;
  activeHref?: string;
  className?: string;
};

// Must match --breakpoint-nav in globals.css: past this width the desktop nav takes over.
const DESKTOP_QUERY = "(min-width: 64rem)";

// Gap between the bottom of the header bar and the top of the panel.
const PANEL_GAP = 8;

// Locks <html> only. Setting overflow on <body> as well turns <body> into its own scroll container
// (scrolled to 0), so the sticky header re-sticks to the top of the document, off-screen once the
// page has scrolled, and takes the menu button with it.
function setPageScrollLocked(isLocked: boolean) {
  document.documentElement.style.overflow = isLocked ? "hidden" : "";
}

export default function MobileMenu({ navigation, activeHref, className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Where the panel's top edge sits in the viewport: just under the header bar, measured on open.
  const [panelTop, setPanelTop] = useState(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const menuId = useId();

  const measurePanelTop = useCallback(() => {
    const bar = toggleRef.current?.closest("header")?.firstElementChild ?? toggleRef.current;
    if (bar) setPanelTop(bar.getBoundingClientRect().bottom + PANEL_GAP);
  }, []);

  const openMenu = () => {
    measurePanelTop();
    setIsOpen(true);
  };

  const closeMenu = useCallback((shouldRestoreFocus: boolean) => {
    setIsOpen(false);
    if (shouldRestoreFocus) toggleRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    setPageScrollLocked(true);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    // The page can't scroll while the menu is open, but rotating the phone can move the bar.
    window.addEventListener("resize", measurePanelTop);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };
    // If the window grows past the breakpoint the menu disappears, so don't leave the page locked behind it.
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const handleBreakpoint = () => {
      if (desktop.matches) closeMenu(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleBreakpoint);

    return () => {
      setPageScrollLocked(false);
      window.removeEventListener("resize", measurePanelTop);
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleBreakpoint);
    };
  }, [isOpen, closeMenu, measurePanelTop]);

  // Keeps Tab cycling through the button and the open panel, since the page behind is blurred out.
  // The panel is portaled to the end of <body>, so the browser's own Tab order would jump from the
  // button into the page; every Tab is moved by hand instead. (React bubbles the panel's key events
  // up to this wrapper even though the panel sits elsewhere in the DOM.)
  const handleTabKey = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!isOpen || event.key !== "Tab") return;
    const focusable = [toggleRef.current, ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a") ?? [])].filter(
      (element): element is HTMLElement => element !== null,
    );
    const current = focusable.indexOf(document.activeElement as HTMLElement);
    const step = event.shiftKey ? -1 : 1;
    const next = current === -1 ? 0 : (current + step + focusable.length) % focusable.length;

    event.preventDefault();
    focusable[next]?.focus();
  };

  // Unlock before the browser follows the link, so it can scroll to the section.
  // Focus is left to the browser, which moves it to the section the link points at.
  const handleLinkClick = () => {
    setPageScrollLocked(false);
    closeMenu(false);
  };

  return (
    <div className={cn("flex", className)} onKeyDown={handleTabKey}>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
        aria-label={isOpen ? navigation.closeMenuLabel : navigation.openMenuLabel}
        onClick={() => (isOpen ? closeMenu(true) : openMenu())}
        className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-ink text-text-on-dark"
      >
        {isOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
      </button>

      {isOpen &&
        // The backdrop and the panel live in a portal on <body>, outside the header, so nothing on the
        // bar (its sticky position, backdrop-filter, isolation or a future overflow or transform) can
        // trap them or clip them. Keyboard events still bubble to this component through React.
        createPortal(
          <>
            {/* Below the header (z-30), so the close button stays sharp and tappable. */}
            <div
              aria-hidden="true"
              onClick={() => closeMenu(true)}
              className="fixed inset-0 z-20 animate-fade-in bg-ink/38 backdrop-blur-sm"
            />
            <nav
              id={menuId}
              ref={panelRef}
              aria-label={navigation.label}
              style={{ top: panelTop }}
              className="fixed inset-x-2 z-40 flex max-h-[calc(100dvh-5rem)] animate-fade-up flex-col gap-0.5 overflow-y-auto rounded-card-lg bg-ink p-2 text-text-on-dark shadow-menu [animation-duration:250ms] md:inset-x-4"
            >
              {navigation.links.map((link) => {
                const isActive = link.href === activeHref;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex min-h-11 items-center rounded-field px-3 text-lead font-semibold",
                      isActive ? "bg-ink-line text-accent-on-dark" : "hover:bg-ink-raised",
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div className="mt-1.5 flex gap-2 border-t border-ink-line pt-2">
                <Button
                  text={navigation.logIn.label}
                  href={navigation.logIn.href}
                  variant="outlineOnDark"
                  size="md"
                  className="flex-1"
                />
                <Button
                  text={navigation.signUp.label}
                  href={navigation.signUp.href}
                  variant="accent"
                  size="md"
                  endIcon={<ArrowRightIcon size={16} />}
                  className="flex-1 gap-2"
                />
              </div>
            </nav>
          </>,
          document.body,
        )}
    </div>
  );
}
