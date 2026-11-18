export type Carrier = {
  /** Full name, e.g. "DHL Express". */
  name: string;
  /** Name as people say it, e.g. "FedEx", for "Book with FedEx" in the hero visual. */
  shortName: string;
  /** Three-letter tile in the hero visual, e.g. "FDX". */
  monogram: string;
  /** Upper-case word on the carrier band and sign-up chips, e.g. "FEDEX". */
  wordmark: string;
};

export type CarrierBands = {
  /** Read by screen readers for the whole band section. */
  label: string;
  statement: {
    label: string;
    items: string[];
  };
  carriersLabel: string;
};
