package com.fms.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "studentinfo")
public class StudentInfo implements Serializable{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@Column
	private String fname;
	@Column
	private String mname;
	@Column
	private String lname;
	@Column
	private String semail;
	@Column
	private String smobile;
	@Column
	private Integer sclass;
	@Column
	private String pname;
	@Column
	private String pmobile;
	@Column
	private String pemail;
	@Column
	private Integer companyId;
	@Column
	private String cschool;
	@Column
	private String admidate;
	@Column
	private int feepack;
	@Column
	private Date adminssionDate ;
	@Column
	private String searchResult ;
	@Column
	private boolean isactive ;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getMname() {
		return mname;
	}
	public void setMname(String mname) {
		this.mname = mname;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public String getSemail() {
		return semail;
	}
	public void setSemail(String semail) {
		this.semail = semail;
	}
	public String getSmobile() {
		return smobile;
	}
	public void setSmobile(String smobile) {
		this.smobile = smobile;
	}
	public Integer getSclass() {
		return sclass;
	}
	public void setSclass(Integer sclass) {
		this.sclass = sclass;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public String getPmobile() {
		return pmobile;
	}
	public void setPmobile(String pmobile) {
		this.pmobile = pmobile;
	}
	public String getPemail() {
		return pemail;
	}
	public void setPemail(String pemail) {
		this.pemail = pemail;
	}
	public Integer getCompanyId() {
		return companyId;
	}
	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}
	public String getCschool() {
		return cschool;
	}
	public void setCschool(String cschool) {
		this.cschool = cschool;
	}
	public String getAdmidate() {
		return admidate;
	}
	public void setAdmidate(String admidate) {
		this.admidate = admidate;
	}
	
	public Date getAdminssionDate() {
		return adminssionDate;
	}
	public void setAdminssionDate(Date adminssionDate) {
		this.adminssionDate = adminssionDate;
	}
	public boolean isIsactive() {
		return isactive;
	}
	public void setIsactive(boolean isactive) {
		this.isactive = isactive;
	}
	public String getSearchResult() {
		return searchResult;
	}
	public void setSearchResult(String searchResult) {
		this.searchResult = searchResult;
	}
	public int getFeepack() {
		return feepack;
	}
	public void setFeepack(int feepack) {
		this.feepack = feepack;
	}
	
	
	
	
	
	
}
