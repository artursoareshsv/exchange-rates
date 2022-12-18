export interface TimeSeries {
	success: boolean;
	timeseries: boolean;
	start_date: string;
	end_date: string;
	base: string;
	target: string;
	rates: Record<string, Rate>;
}

type Rate = Record<string, number>;
