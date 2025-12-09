type Env = {
  Bindings: {
    PORT: number;
    MONGO_URI: string;
    NODE_ENV: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: number;
  };
};
