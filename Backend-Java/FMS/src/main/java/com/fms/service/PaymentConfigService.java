package com.fms.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fms.entity.PaymentConfig;
import com.fms.helper.CrossMessage;
import com.fms.repo.PaymentConfigRepo;

@Service
public class PaymentConfigService {
	
	@Autowired
	PaymentConfigRepo PaymentConfigRepo;
	
	public CrossMessage deletepaymentConfiguration(String template,Integer companyId)
	{
		CrossMessage result=new CrossMessage();
		try
		{
			PaymentConfig paymentC=PaymentConfigRepo.findByCompanyIdAndPackagename(companyId,template);
			PaymentConfigRepo.delete(paymentC);
			result.status=200;
			result.message="successfully delted ";
		}catch (Exception e) {
			result.status=300;
			result.message="Failed to delte";
		}
		return result;
	}
	public CrossMessage savepaymentConfig(PaymentConfig paymentConfig,Integer companyId)
	{
		CrossMessage result=new CrossMessage();
		
		try
		{
			PaymentConfig paymentC=PaymentConfigRepo.findByCompanyIdAndPackagename(companyId, paymentConfig.getPackagename());
			if(paymentC==null)
				PaymentConfigRepo.save(paymentConfig);
			else
			{
				paymentC.setPackagename(paymentConfig.getPackagename());
				paymentC.setPaymentstructure(paymentConfig.getPaymentstructure());
				PaymentConfigRepo.save(paymentC);
			}
			result.status=200;
			result.message="saved successfully";
		}catch (Exception e) {
			result.status=300;
			result.message="Failed to save";
		}
		return result;
	}
	public List<PaymentConfig> getPaymentConfig(Integer companyId)
	{
		
		try
		{
			return PaymentConfigRepo.findByCompanyId(companyId);
		}catch (Exception e) {
		  return new ArrayList<>();
		}
	}

}
