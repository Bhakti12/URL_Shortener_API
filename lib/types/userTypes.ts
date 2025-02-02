export declare type GetRegisterUser = {
	id?: String;
	firstName?: String;
	lastName?: String;
	phoneNumber?: String;
	emailId?: String;
	password?: String;
};

export declare type RegisterUser = {
	sId?: string;
    firstName: String;
    lastName: String;
    emailId: String;
    password: String;
	lastLoginAt?: Date;
};