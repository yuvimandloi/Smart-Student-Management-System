package com.project.ssms.controller;

import com.project.ssms.dto.StudentDTO;
import com.project.ssms.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3002"
})
public class DashboardController {

    @Autowired
    private StudentService service;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {

        List<StudentDTO> students = service.getAllStudents();

        int totalStudents = students.size();

        long totalCourses = students.stream()
                .map(StudentDTO::getCourse)
                .distinct()
                .count();

        long paidFees = students.stream()
                .filter(s ->
                        s.getFeesStatus() != null &&
                                s.getFeesStatus().equalsIgnoreCase("Paid"))
                .count();

        double avgAttendance = students.stream()
                .filter(s -> s.getAttendance() != null)
                .mapToDouble(s -> {
                    try {
                        return Double.parseDouble(
                                s.getAttendance().replace("%", "").trim()
                        );
                    } catch (Exception e) {
                        return 0;
                    }
                })
                .average()
                .orElse(0);

        Map<String, Object> stats = new HashMap<>();

        stats.put("totalStudents", totalStudents);
        stats.put("totalCourses", totalCourses);
        stats.put("paidFees", paidFees);
        stats.put("avgAttendance", Math.round(avgAttendance));

        return stats;
    }


}
