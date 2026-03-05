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

export type SerialisedMailingAddress = {
  id: string;
  label: string | null;
  mailingAddress: string;
};

// Location is one-or-none per person — null means not set yet
export type SerialisedLocation = {
  id: string;
  city: string | null;
  country: string | null;
} | null;

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
  mailingAddresses: SerialisedMailingAddress[];
  location: SerialisedLocation;
  notes: SerialisedNote[];
  customAttributes: SerialisedCustomAttribute[];
};