package com.fms.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fms.entity.PaymentConfig;


@Repository
public interface PaymentConfigRepo extends CrudRepository<PaymentConfig, Integer>{
 List<PaymentConfig> findByCompanyId(Integer companyId);
 PaymentConfig findByCompanyIdAndPackagename(Integer companyId,String packagename);
}
