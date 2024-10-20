import Connect from "@/DBConfig/DBConfig";
import { NextRequest, NextResponse } from "next/server";
import Company from "@/models/company.model";

Connect();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get companyName
    const { CompanyName } = await request.json();

    if (!CompanyName) {
      return NextResponse.json({
        message: "Company name is required",
        status: 400,
      });
    }

    // Search for the company using companyName
    const company = await Company.findOne({CompanyName});
    console.log("Company Found: ", company);

    if (!company) {
      return NextResponse.json({
        message: "No Company Found",
        status: 304,
      });
    }

    return NextResponse.json({
      message: "Company Found Successfully",
      status: 200,
      company,
    });
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json({
      status: 500,
      message: "Error Fetching Company",
    });
  }
}
