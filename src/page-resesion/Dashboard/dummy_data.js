import moment from "moment";


export const rooms = [
  {
    id: 1,
    name: "1"
  },
  {
    id: 2,
    name: "2"
  },
  {
    id: 3,
    name: "3"
  },
  {
    id: 4,
    name: "4"
  },
  {
    id: 5,
    name: "5"
  },
  {
    id: 6,
    name: "6"
  },
  {
    id: 7,
    name: "7"
  },
  {
    id: 8,
    name: "8"
  },
  {
    id: 9,
    name: "9"
  },
  {
    id: 10,
    name: "10"
  },
  {
    id: 9,
    name: "11"
  },
  {
    id: 10,
    name: "12"
  }
];

export const bookings = [
  {
    id: 1,
    group: 3,
    title:`Reservas 365`,
    start_time: new Date(`2022-09-${8+1}`),
    end_time: new Date(`2022-09-${10+1}`),
    state:3
    
  },
  {
    id: 2,
    group: 1,
    title: "Reservas  3065",
    start_time: moment().add(-3, "day"),
    end_time: moment().add(1, "day"),
    state:3
  },
  {
    id: 3,
    group: 5,
    title: "Reservas  3065",
    start_time: moment().add(2, "day"),
    end_time: moment().add(4, "day"),
    state:3
  },
];

let bookingsMapTemp = {};
bookings.forEach((booking) => {
  bookingsMapTemp[booking.id] = booking;
});

export const bookingsMappedById = bookingsMapTemp;
