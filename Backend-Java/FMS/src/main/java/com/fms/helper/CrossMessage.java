package com.fms.helper;

import java.io.Serializable;

public class CrossMessage implements Serializable{
	
	public int status;
	public String message;
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}

	
}
