import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskFilters from "../component/TaskFilterPriority";

describe("TaskFilters", () => {
  const filters = [
    { key: "all", label: "Created At" },
    { key: "high_low", label: "High-Low" },
    { key: "low_high", label: "Low-High" },
  ];

  it("renders all filter buttons", () => {
    render(<TaskFilters filter="all" onFilterChange={() => {}} />);
    filters.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("calls onFilterChange with correct key when a button is clicked", () => {
    let calledWith = [];
    const onFilterChange = (key) => calledWith.push(key);
    render(<TaskFilters filter="all" onFilterChange={onFilterChange} />);
    fireEvent.click(screen.getByText("High-Low"));
    expect(calledWith).toContain("high_low");
    fireEvent.click(screen.getByText("Low-High"));
    expect(calledWith).toContain("low_high");
  });

  it("applies active class to the selected filter", () => {
    render(<TaskFilters filter="high_low" onFilterChange={() => {}} />);
    const activeBtn = screen.getByText("High-Low");
    expect(activeBtn.className).toMatch(/bg-primary/);
    expect(activeBtn.className).toMatch(/text-primary-foreground/);
  });

  it("applies inactive class to non-selected filters", () => {
    render(<TaskFilters filter="low_high" onFilterChange={() => {}} />);
    const inactiveBtn = screen.getByText("Created At");
    expect(inactiveBtn.className).toMatch(/bg-background/);
    expect(inactiveBtn.className).toMatch(/hover:bg-muted/);
  });

  it("renders with no filter selected if filter prop is undefined", () => {
    render(<TaskFilters onFilterChange={() => {}} />);
    filters.forEach(({ label }) => {
      const btn = screen.getByText(label);
      expect(btn.className).toMatch(/bg-background/);
    });
  });

  it("all buttons are accessible and clickable", () => {
    let calledWith = [];
    const onFilterChange = (key) => calledWith.push(key);
    render(<TaskFilters filter="all" onFilterChange={onFilterChange} />);
    filters.forEach(({ label, key }) => {
      const btn = screen.getByText(label);
      fireEvent.click(btn);
      expect(calledWith).toContain(key);
    });
  });

  it("buttons have type='button'", () => {
    render(<TaskFilters filter="all" onFilterChange={() => {}} />);
    filters.forEach(({ label }) => {
      expect(screen.getByText(label).getAttribute("type")).toBe("button");
    });
  });
});