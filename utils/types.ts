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
} & FromStationList
