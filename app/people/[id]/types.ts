// Serialised versions of Prisma types — Dates converted to ISO strings
// so they can safely cross the server/client boundary as props.

export type SerialisedPhoneNumber = {
  id: string;
  label: string | null;
  number: string;
};

export type SerialisedEmailAddress = {
  id: string;
  label: string | null;
  address: string;
};

export type SerialisedAddress = {
  id: string;
  label: string | null;
  mailingAddress: string;
  country: string | null;
};

export type SerialisedNote = {
  id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
};

export type SerialisedCustomAttribute = {
  id: string;
  key: string;
  value: string;
  createdAt: string;
};

export type SerialisedPerson = {
  id: string;
  displayName: string;
  fullName: string | null;
  birthDay: number | null;
  birthMonth: number | null;
  birthYear: number | null;
  createdAt: string;
  updatedAt: string;
  phoneNumbers: SerialisedPhoneNumber[];
  emailAddresses: SerialisedEmailAddress[];
  addresses: SerialisedAddress[];
  notes: SerialisedNote[];
  customAttributes: SerialisedCustomAttribute[];
};