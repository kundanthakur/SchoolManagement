package com.fms.dto;

import javax.persistence.Column;

import org.json.JSONArray;

import com.fms.entity.PaymentConfig;

public class PaymentConfigDto {
	
	public int id;
	public String packagename;
	public Integer companyId;
	public JSONArray paymentstructure;


	public PaymentConfig changetoentity(PaymentConfigDto dto)
	{
		PaymentConfig pconfig=new PaymentConfig();
		try
		{
			pconfig.setCompanyId(dto.companyId);
			pconfig.setPackagename(dto.packagename);
		}catch (Exception e) {
			
		}	
		return pconfig;
	}
}
