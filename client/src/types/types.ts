export type ShortenRequest = {
  url: string;
  custom_slug?: string;
};

export type ResponseData = {
  short_url: string;
  short_code: string;
};

export type CopyStatus = "success" | "error" | null;

export type UseUrlShortenerReturn = {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  customSlug: string;
  setCustomSlug: React.Dispatch<React.SetStateAction<string>>;
  response: ResponseData | null;
  error: string | null;
  loading: boolean;
  reset: () => void;
  handleSubmit: (event: React.FormEvent) => void;
};

export type UseAllShortCodesReturn = {
  loading: boolean;
  error: string | null;
  shortCodes: ShortCode[];
  headers: string[];
};

export type UseConfirmResetReturn = {
  isModalOpen: boolean;
  confirmText: string;
  isConfirmEnabled: boolean;
  openModal: () => void;
  closeModal: () => void;
  setConfirmText: React.Dispatch<React.SetStateAction<string>>;
  handleConfirm: () => void;
};

export type AnalyticsType = {
  original_url: string;
  short_code: string;
  access_count: number;
  last_accessed: string | null;
};

export type UseCopyToClipboardReturn = {
  copyStatus: CopyStatus;
  copyToClipboard: (text: string) => Promise<void>;
};

export type ShortCodeParam = { short_code: string };

export interface ShortCode {
  short_code: string;
  original_url: string;
}
