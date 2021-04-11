package com.fms.entity;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import org.json.JSONArray;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;


@Entity
@Table(name = "paymentconfig")
public class PaymentConfig {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column
	private String packagename;
	
	@Column
	private Integer companyId;
	
	 @Column(columnDefinition = "TEXT")
	private String paymentstructure;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPackagename() {
		return packagename;
	}

	public void setPackagename(String packagename) {
		this.packagename = packagename;
	}

	public Integer getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

	public String getPaymentstructure() {
		return paymentstructure;
	}

	public void setPaymentstructure(String paymentstructure) {
		this.paymentstructure = paymentstructure;
	}
	
	
	
}
