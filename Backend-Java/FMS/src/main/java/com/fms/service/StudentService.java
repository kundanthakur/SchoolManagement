package com.fms.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.fms.entity.StudentInfo;
import com.fms.helper.CrossMessage;
import com.fms.repo.StudentRepo;

@Service
public class StudentService {
	
	
	@Autowired
	StudentRepo stuRepo;
	
	public StudentInfo getstudentbyId(int id,int companyId)
	{
		try
		{
			return stuRepo.findByCompanyIdAndId(companyId, id);
		}catch (Exception e) {
			return null;
		}
	}
	
	public List<StudentInfo> getStudent(int companyId,int pageno)
	{
		try
		{
		   return stuRepo.findByCompanyIdAndIsactive(companyId, true, PageRequest.of(pageno, 8,Sort.by("adminssionDate").descending()));
		}catch (Exception e) {
			return new ArrayList<>();
		}
	}
	public List<StudentInfo> getStudentwithsearch(int companyId,int pageno,String search)
	{
		try
		{
		   return stuRepo.findByCompanyIdAndSearchResultIgnoreCaseContainingAndIsactive(companyId,search, true,  PageRequest.of(pageno, 8,Sort.by("adminssionDate").descending()));
		}catch (Exception e) {
			return new ArrayList<>();
		}
	}
	
	public void search()
	{
		List<StudentInfo> stu=(List<StudentInfo>) stuRepo.findAll();
		for(StudentInfo s:stu)
		{
			String sear="";
			sear=s.getFname()+";"+s.getLname()+";"+s.getMname()+";"+s.getSemail()+";"+s.getPname();
			s.setSearchResult(sear);
			stuRepo.save(s);
			
		}
	}
	
	public CrossMessage savestudent(StudentInfo studentinfo)
	{
		CrossMessage msg=new CrossMessage();
		try
		{
			StudentInfo studen=stuRepo.findByCompanyIdAndIsactiveAndSemailAndSclass(studentinfo.getCompanyId(), true, studentinfo.getSemail(),studentinfo.getSclass());
			if(studen!=null)
			{
			
				msg.status=300;
				msg.message="Student Already enrolled to this class";
			}else
			{
				String sear=studentinfo.getFname()+";"+studentinfo.getLname()+";"+studentinfo.getMname()+";"+studentinfo.getSemail()+";"+studentinfo.getPname();
				studentinfo.setSearchResult(sear);
				studentinfo.setAdminssionDate(new Date());
				studentinfo.setIsactive(true);
				stuRepo.save(studentinfo);
				msg.status=200;
				msg.message="Student saved sucessFully";
			}
			
			return msg;
		}catch (Exception e) {
			e.printStackTrace();
			msg.status=300;
			msg.message="Failed to save Student Info ";
			
			return msg;
		}
	}

}
