package com.project.ssms.dto;

public class StudentDTO {

    private Long id;
    private String name;
    private String email;
    private String course;
    private String year;
    private String attendance;
    private String feesStatus;
    private String marks;

    // GETTERS
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getCourse() {
        return course;
    }

    public String getYear() {
        return year;
    }

    public String getAttendance() {
        return attendance;
    }

    public String getFeesStatus() {
        return feesStatus;
    }

    public String getMarks() {
        return marks;
    }

    // SETTERS
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public void setAttendance(String attendance) {
        this.attendance = attendance;
    }

    public void setFeesStatus(String feesStatus) {
        this.feesStatus = feesStatus;
    }

    public void setMarks(String marks) {
        this.marks = marks;
    }
}