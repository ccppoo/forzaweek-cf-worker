type ImageUploadResponseBase = {
	code: number;
};

export type ImageUploadSuccessResponse = ImageUploadResponseBase & {
	name: string;
	remoteURL: string;
	aliveUntil: number;
	time: number;
	size: number;
};

export type ImageUploadFailResponse = ImageUploadResponseBase & {
	reason: string;
};
