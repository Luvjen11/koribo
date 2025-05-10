package com.koribo_backend.repository;

import com.koribo_backend.model.Module;
import com.koribo_backend.model.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
    List<Module> findByLanguage(Language language);
    List<Module> findByLanguageOrderByOrderIndexAsc(Language language);
}