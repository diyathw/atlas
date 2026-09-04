import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders an anchor when href is provided", () => {
    render(<Button href="#contact">Request a walkthrough</Button>);
    const link = screen.getByRole("link", { name: "Request a walkthrough" });
    expect(link).toHaveAttribute("href", "#contact");
  });

  it("renders a button element when no href is provided", () => {
    render(<Button type="submit">Send request</Button>);
    const button = screen.getByRole("button", { name: "Send request" });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("applies the primary variant classes by default", () => {
    render(<Button href="#contact">Go</Button>);
    expect(screen.getByRole("link")).toHaveClass("bg-[#E3E14A]");
  });

  it("applies the secondary variant classes when requested", () => {
    render(
      <Button href="#quality" variant="secondary">
        See our quality program
      </Button>
    );
    expect(screen.getByRole("link")).toHaveClass("border");
  });

  it("disables the underlying button and prevents clicks", async () => {
    const onClick = jest.fn();
    render(
      <Button type="button" disabled onClick={onClick}>
        Sending…
      </Button>
    );
    const button = screen.getByRole("button", { name: "Sending…" });
    expect(button).toBeDisabled();

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("calls onClick when an enabled link is clicked", async () => {
    const onClick = jest.fn();
    render(
      <Button href="#contact" onClick={onClick}>
        Request a walkthrough
      </Button>
    );
    await userEvent.click(screen.getByRole("link"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders full width when fullWidth is set", () => {
    render(
      <Button type="submit" fullWidth>
        Send request
      </Button>
    );
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });
});
