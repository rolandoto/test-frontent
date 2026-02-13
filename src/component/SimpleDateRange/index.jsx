import React from "react";

const toInputDate = (value) => {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

const SimpleDateRange = ({ ranges = [], onChange, minDate, disabled }) => {
  const selection = ranges[0] || {};
  const startDate = selection.startDate ? new Date(selection.startDate) : new Date();
  const endDate = selection.endDate ? new Date(selection.endDate) : startDate;
  const key = selection.key || "selection";

  const updateRange = (field, value) => {
    const nextStart = field === "startDate" ? new Date(value) : startDate;
    const nextEnd = field === "endDate" ? new Date(value) : endDate;

    if (onChange) {
      onChange({
        [key]: {
          ...selection,
          key,
          startDate: nextStart,
          endDate: nextEnd,
        },
      });
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <input
        type="date"
        value={toInputDate(startDate)}
        min={toInputDate(minDate)}
        disabled={disabled}
        onChange={(event) => updateRange("startDate", event.target.value)}
      />
      <span>—</span>
      <input
        type="date"
        value={toInputDate(endDate)}
        min={toInputDate(startDate)}
        disabled={disabled}
        onChange={(event) => updateRange("endDate", event.target.value)}
      />
    </div>
  );
};

export default SimpleDateRange;
