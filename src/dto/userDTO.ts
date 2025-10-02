interface userDTO {
  _id: string;
  userName: string;
  email: string;
  password?: string;
  payments: [];
  history: [];
  trialActive: boolean;
  trialPeriod: number;
  apiRequestCount: number;
  nextBillingDate:Date;
  monthlyRequestLimit: number;
  monthlyRequestsCount: number;
  trialExpires: Date;
  createdAt: Date;
  updatedAt: Date;
}
