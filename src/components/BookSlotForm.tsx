import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { CalendarEvent } from "../types";

type BookSlotFormProps = {
  onSubmit: (event: CalendarEvent) => void;
  startTime: Date;
  endTime: Date;
  duration: number;
};

const BookSlotForm: React.FC<BookSlotFormProps> = ({
  onSubmit,
  startTime,
  endTime,
  duration,
}) => {
  const [email, setEmail] = useState("");
  const [did, setDID] = useState("did:dht:123456789abcdefghiJKLMN");

  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    const event: CalendarEvent = {
      id: "Asdf", //uuidv4(),
      summary: name ? `${name}'s Slot` : "Booked Slot",
      participants: email ? [email] : [],
      start: { dateTime: startTime },
      end: { dateTime: endTime },
    };

    if (notes) {
      event.summary += ` - ${notes}`;
    }

    onSubmit(event);
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h6">Book a Slot</Typography>
      <TextField
        label="Start Time"
        value={new Date(startTime).toLocaleString()}
        InputLabelProps={{ shrink: true }}
        disabled
        fullWidth
      />
      <TextField
        label="End Time"
        value={new Date(endTime).toLocaleString()}
        InputLabelProps={{ shrink: true }}
        disabled
        fullWidth
      />
      <TextField
        label="Duration (minutes)"
        type="number"
        value={duration}
        InputLabelProps={{ shrink: true }}
        disabled
        fullWidth
      />
      <TextField
        label="DID"
        type="did"
        value={did}
        onChange={(e) => setDID(e.target.value)}
        fullWidth
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        label="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        multiline
        rows={4}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Book Slot
      </Button>
    </Box>
  );
};

export default BookSlotForm;
