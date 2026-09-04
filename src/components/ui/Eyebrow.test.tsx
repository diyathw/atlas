import { render, screen } from "@testing-library/react";
import Eyebrow from "./Eyebrow";

describe("Eyebrow", () => {
  it("renders its children as text", () => {
    render(<Eyebrow>01 — SERVICES</Eyebrow>);
    expect(screen.getByText("01 — SERVICES")).toBeInTheDocument();
  });

  it("defaults to the olive tone", () => {
    render(<Eyebrow>02 — QUALITY PROGRAM</Eyebrow>);
    expect(screen.getByText("02 — QUALITY PROGRAM")).toHaveClass(
      "text-[#454F30]"
    );
  });

  it("applies the light tone on dark backgrounds", () => {
    render(<Eyebrow tone="light">05 — GET A PRICE</Eyebrow>);
    expect(screen.getByText("05 — GET A PRICE")).toHaveClass("text-white/55");
  });

  it("applies the accent tone", () => {
    render(<Eyebrow tone="accent">SINCE 2004</Eyebrow>);
    expect(screen.getByText("SINCE 2004")).toHaveClass("text-[#E3E14A]");
  });

  it("merges in a custom className", () => {
    render(<Eyebrow className="mb-4">RECENT SITE WORK</Eyebrow>);
    expect(screen.getByText("RECENT SITE WORK")).toHaveClass("mb-4");
  });
});
