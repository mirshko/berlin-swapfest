import { format } from "date-fns";
import { EVENT_DATE } from "./date";
import {
  ADDRESS_LOCALITY,
  ADRESS_COUNTRY_FULL,
  POSTAL_CODE,
  STREET_ADDRESS,
} from "./location";

export const ICS_DT_PREFIX = `${format(EVENT_DATE, "yyyyMMdd")}`;

export const ICS_LOCATION = `${STREET_ADDRESS}, ${ADDRESS_LOCALITY}, ${POSTAL_CODE}, ${ADRESS_COUNTRY_FULL}`;
