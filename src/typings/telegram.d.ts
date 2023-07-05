type TelegramPhoto = {
  dc_id: number;
  flags: number;
  has_video: boolean;
  photo_id: string;
  stripped_thum: Record<string, number>;
};

type TelegramUserStatus = {
  was_online: number;
  _: string;
};

type TelegramUser = {
  access_hash: string;
  apply_min_photo: boolean;
  bot: boolean;
  bot_chat_history: boolean;
  bot_inline_geo: boolean;
  bot_nochats: boolean;
  contact: boolean;
  deleted: boolean;
  fake: boolean;
  first_name: string;
  flags: number;
  id: string;
  last_name: string;
  min: boolean;
  mutual_contact: boolean;
  phone?: string;
  restricted: boolean;
  scam: boolean;
  self: boolean;
  support: boolean;
  username?: string;
  verified: boolean;
  photo?: TelegramPhoto;
  status: TelegramUserStatus;
};

type TelegramUserResponse = {
  chats: any[];
  full_user: any;
  users: TelegramUser[];
};

type TelegramContact = {
  mutual: boolean;
  user_id: string;
  _: string;
};

type TelegramContactsResponse = {
  contacts: TelegramContact[];
  saved_count: number;
  users: TelegramUser[];
};

type TelegramChannel = {
  access_hash: string;
  broadcast: boolean;
  call_active: boolean;
  call_not_empty: boolean;
  creator: boolean;
  date: number;
  fake: boolean;
  flags: number;
  gigagroup: boolean;
  has_geo: boolean;
  has_link: boolean;
  id: string;
  left: boolean;
  megagroup: boolean;
  min: boolean;
  noforwards: boolean;
  participants_count: number;
  restricted: boolean;
  scam: boolean;
  signatures: boolean;
  slowmode_enabled: boolean;
  title: string;
  verified: boolean;
  _: 'channel';
  photo?: TelegramPhoto;
};

type TelegramChatBannedRights = {
  change_info: boolean;
  embed_links: boolean;
  flags: number;
  invite_users: boolean;
  pin_messages: boolean;
  send_games: boolean;
  send_gifs: boolean;
  send_inline: boolean;
  send_media: boolean;
  send_messages: boolean;
  send_polls: boolean;
  send_stickers: boolean;
  until_date: number;
  view_messages: boolean;
  _: 'chatBannedRights';
};

type TelegramChat = {
  call_active: boolean;
  call_not_empty: boolean;
  creator: boolean;
  date: number;
  deactivated: boolean;
  flags: number;
  id: string;
  kicked: boolean;
  left: boolean;
  noforwards: boolean;
  participants_count: number;
  title: string;
  version: number;
  _: 'chat';
  photo?: TelegramPhoto;
  default_banned_rights: TelegramChatBannedRights;
};

type TelegramGetDialogsResponse = {
  chats: any[];
  count: number;
  dialogs: any[];
  messages: any[];
  users: TelegramUser[] | TelegramChat[];
};
