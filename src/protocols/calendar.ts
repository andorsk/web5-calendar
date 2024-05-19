export const calendarProtocol = {
  protocol: "https://andor.us/calendly",
  published: true,
  types: {
    calendar: {
      schema: "event",
      dataFormats: ["application/json"],
    },
    event: {
      schema: "calendar",
      dataFormats: ["application/json"],
    },
  },
  structure: {
    calendar: {
      $actions: [
        {
          who: "author",
          can: ["create"],
        },
      ],
      event: {
        $actions: [
          {
            who: "participants",
            can: ["create"],
          },
        ],
      },
    },
  },
};
