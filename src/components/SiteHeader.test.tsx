import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SiteHeader from "./SiteHeader";

describe("SiteHeader", () => {
  it("renders the wordmark and primary nav links", () => {
    render(<SiteHeader />);
    expect(screen.getByText("ATLAS")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Services" })[0]
    ).toHaveAttribute("href", "#services");
  });

  it("keeps the phone number visible at all times", () => {
    render(<SiteHeader />);
    expect(
      screen.getByRole("link", { name: "(602) 555-0148" })
    ).toHaveAttribute("href", "tel:16025550148");
  });

  it("mobile menu starts closed", () => {
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: "Toggle menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the mobile menu on toggle click", async () => {
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: "Toggle menu" });

    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the mobile menu again on a second click", async () => {
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: "Toggle menu" });

    await userEvent.click(toggle);
    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the mobile menu when a nav link is clicked", async () => {
    render(<SiteHeader />);
    const toggle = screen.getByRole("button", { name: "Toggle menu" });
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    const mobileServicesLink = screen.getAllByRole("link", {
      name: "Services",
    })[1];
    await userEvent.click(mobileServicesLink);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
