package com.fms.repo;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fms.entity.StudentInfo;


@Repository
public interface StudentRepo extends CrudRepository<StudentInfo, Integer>{
		
	List<StudentInfo> findByCompanyIdAndIsactive(int companyId,boolean isactive,Pageable pageable);
	StudentInfo findByCompanyIdAndIsactiveAndSemailAndSclass(int companyId,boolean isactive,String semail,int sclass);
	StudentInfo findByCompanyIdAndId(int companyId,int id);
	List<StudentInfo> findByCompanyIdAndSearchResultIgnoreCaseContainingAndIsactive(int companyId,String searchResult,boolean isactive,Pageable pageable);
}
