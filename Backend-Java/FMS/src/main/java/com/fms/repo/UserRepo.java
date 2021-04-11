package com.fms.repo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.fms.entity.User;


@Repository
public interface UserRepo extends CrudRepository<User, Integer>{
	
	User findByUsername(String email); 
	

}
