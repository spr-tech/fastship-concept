import type { Carrier, CarrierBands } from "@/models/carrier";

export const carriers: Carrier[] = [
  { name: "DHL Express", monogram: "DHL", wordmark: "DHL" },
  { name: "FedEx", monogram: "FDX", wordmark: "FEDEX" },
  { name: "UPS", monogram: "UPS", wordmark: "UPS" },
  { name: "Aramex", monogram: "ARX", wordmark: "ARAMEX" },
  { name: "GIG Logistics", monogram: "GIG", wordmark: "GIG" },
];

export const carrierBands: CarrierBands = {
  label: "Carriers",
  statement: {
    label: "One dashboard, every shipment.",
    items: ["ONE DASHBOARD", "EVERY SHIPMENT"],
  },
  carriersLabel: "Carriers: DHL, FedEx, UPS, Aramex and GIG.",
};
