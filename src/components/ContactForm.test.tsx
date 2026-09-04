import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";

describe("ContactForm", () => {
  it("defaults facility type to Office and sqft to 58,000", () => {
    render(<ContactForm />);
    expect(screen.getByText("Office").closest("button")).toHaveClass(
      "bg-[#E3E14A]/25"
    );
    expect(screen.getByText("58,000 sq ft")).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", async () => {
    render(<ContactForm />);
    await userEvent.click(
      screen.getByRole("button", { name: "Send request" })
    );

    expect(screen.getByText("Name is required.")).toBeInTheDocument();
    expect(
      screen.getAllByText("Enter an email or phone number.")
    ).toHaveLength(2);
  });

  it("accepts a phone number in place of an email", async () => {
    render(<ContactForm />);
    await userEvent.type(
      screen.getByPlaceholderText("Jordan Ellery"),
      "Jordan Ellery"
    );
    await userEvent.type(screen.getByPlaceholderText("(480) …"), "4805551234");
    await userEvent.click(
      screen.getByRole("button", { name: "Send request" })
    );

    expect(
      screen.queryByText("Enter an email or phone number.")
    ).not.toBeInTheDocument();
  });

  it("flags a malformed email address", async () => {
    render(<ContactForm />);
    await userEvent.type(
      screen.getByPlaceholderText("Jordan Ellery"),
      "Jordan Ellery"
    );
    await userEvent.type(
      screen.getByPlaceholderText("jordan@…"),
      "not-an-email"
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Send request" })
    );

    expect(
      screen.getByText("That email doesn't look right.")
    ).toBeInTheDocument();
  });

  it("switches the selected facility type on click", async () => {
    render(<ContactForm />);
    const medicalPill = screen.getByText("Medical").closest("button")!;

    await userEvent.click(medicalPill);

    expect(medicalPill).toHaveClass("bg-[#E3E14A]/25");
    expect(screen.getByText("Office").closest("button")).not.toHaveClass(
      "bg-[#E3E14A]/25"
    );
  });

  it("updates the displayed square footage when the slider moves", () => {
    render(<ContactForm />);
    const slider = screen.getByLabelText("Cleanable square feet");

    fireEvent.change(slider, { target: { value: "100000" } });

    expect(screen.getByText("100,000 sq ft")).toBeInTheDocument();
  });

  it("shows the success confirmation after a valid submit", async () => {
    render(<ContactForm />);
    await userEvent.type(
      screen.getByPlaceholderText("Jordan Ellery"),
      "Jordan Ellery"
    );
    await userEvent.type(
      screen.getByPlaceholderText("jordan@…"),
      "jordan@example.com"
    );
    await userEvent.click(
      screen.getByRole("button", { name: "Send request" })
    );

    expect(
      await screen.findByText("Request received", undefined, {
        timeout: 3000,
      })
    ).toBeInTheDocument();
  });
});
