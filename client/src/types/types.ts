export type ShortenRequest = {
  url: string;
};

export type ResponseData = {
  short_url: string;
  short_code: string;
};

export type UseUrlShortenerReturn = {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  response: ResponseData | null;
  error: string | null;
  loading: boolean;
  reset: () => void;
  handleSubmit: (event: React.FormEvent) => void;
};
