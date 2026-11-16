type ConceptBannerProps = {
  text: string;
};

export default function ConceptBanner({ text }: ConceptBannerProps) {
  return (
    <aside
      aria-label="Concept notice"
      className="bg-ink px-4 py-[9px] text-center text-[13px] text-text-on-dark"
    >
      <p>{text}</p>
    </aside>
  );
}
