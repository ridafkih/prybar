export type PodReferenceOptions =
  | {
      name: string;
      path: string;
      url?: never;
      git?: never;
      branch?: never;
      version?: never;
      tag?: never;
      commit?: never;
    }
  | {
      name: string;
      path?: never;
      url: string;
      git?: never;
      branch?: never;
      version?: never;
      tag?: never;
      commit?: never;
    }
  | {
      name: string;
      path?: never;
      url?: never;
      git?: string;
      branch?: never;
      version?: string;
      tag?: never;
      commit?: never;
    }
  | {
      name: string;
      path?: never;
      url?: never;
      git: string;
      branch?: never;
      version?: never;
      tag?: never;
      commit?: never;
    }
  | {
      name: string;
      path?: never;
      url?: never;
      git: string;
      branch?: string;
      version?: never;
      tag?: never;
      commit?: never;
    }
  | {
      name: string;
      path?: never;
      url?: never;
      git: string;
      branch?: never;
      version?: string;
      tag?: never;
      commit?: never;
    }
  | {
      name: string;
      path?: never;
      url?: never;
      git: string;
      branch?: never;
      version?: never;
      tag?: string;
      commit?: never;
    }
  | {
      name: string;
      path?: never;
      url?: never;
      git: string;
      branch?: never;
      version?: never;
      tag?: never;
      commit?: string;
    };
