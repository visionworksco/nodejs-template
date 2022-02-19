import { BaseRequest } from '@visionworksco/nodejs-middleware';

const getUserEmail = (req: BaseRequest): string | undefined => {
  const { user } = req;
  return user ? user.email : undefined;
};

export const ControllerUtils = {
  getUserEmail,
};
