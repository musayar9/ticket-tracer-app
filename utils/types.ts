export type StationTrainTypes = "AH" | "BOLGESEL";
export type ToStationList = { toStationId: number; toStationName: string };
export type FromStationList = {
  stationID: number;
  stationName: string;
  stationViewName?: string;
  stationTrainType?:StationTrainTypes[]
};
export type Station = {
  stationCode: string;
  stationTrainTypes: StationTrainTypes[];
  toStationList: ToStationList[];
} & FromStationList;

export type RequestBody = {
  departureDate: string;
  departureStationID: number;
  arrivalStationID: number;
  departureStation: string;
  arrivalStation: string;
};

export type SearchTicketType = {
  trainID: number;
  trainName: string;
  departureDate: string;
  arrivalDate: string;
  emptyPlace: {
    disabledPlaceCount: number;
    totalEmptyPlaceCount: number;
    normalPeopleEmptyPlaceCount: number;
  };
  arrivalStation: string;
  departureStation: string;
  departureStationID: number;
  arrivalStationID: number;
  minPrice: number;
  totalTripTime: string;
};

export type SelectedTrains = {
  id: string;
  created_at: string;
  updated_at: string;
  departure_station: string;
  departure_date: string;
  arrival_station: string;
  arrival_date: string;
  email: string;
  status: string;
  total_attempt: number;
  gender: string;
};
