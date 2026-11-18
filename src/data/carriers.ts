import type { Carrier, CarrierBands } from "@/models/carrier";

export const carriers: Carrier[] = [
  { name: "DHL Express", shortName: "DHL", monogram: "DHL", wordmark: "DHL" },
  { name: "FedEx", shortName: "FedEx", monogram: "FDX", wordmark: "FEDEX" },
  { name: "UPS", shortName: "UPS", monogram: "UPS", wordmark: "UPS" },
  { name: "Aramex", shortName: "Aramex", monogram: "ARX", wordmark: "ARAMEX" },
  { name: "GIG Logistics", shortName: "GIG", monogram: "GIG", wordmark: "GIG" },
];

export const carrierBands: CarrierBands = {
  label: "Carriers",
  statement: {
    label: "One dashboard, every shipment.",
    items: ["ONE DASHBOARD", "EVERY SHIPMENT"],
  },
  carriersLabel: "Carriers: DHL, FedEx, UPS, Aramex and GIG.",
};
