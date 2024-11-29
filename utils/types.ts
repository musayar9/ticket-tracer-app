export type StationTrainType = "ANAHAT" | "YHT";
export type ToStationList = { toStationId: number; toStationName: string };
export type FromStationList = {
  stationID: number;
  stationName: string;
  stationViewName?: string;
};
export type Station = {
  stationCode: string;
  stationTrainTypes: StationTrainType[];
  toStationList: ToStationList[];
} & FromStationList;

export type RequestBody = {
  gidisTarih: string;
  binisIstasyonId: number;
  inisIstasyonId: number;
  binisIstasyon: string;
  inisIstasyonu: string;
};

export type SearchTicketType = {
  trainID: number;
  trainName: string;
  trainCode: string;
  tourID: number;
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
};
