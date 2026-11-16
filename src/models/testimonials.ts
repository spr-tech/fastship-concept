export type Testimonial = {
  quote: string;
  name: string;
  initials: string;
  location: string;
};

export type Testimonials = {
  title: string;
  items: Testimonial[];
};
