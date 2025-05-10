package com.koribo_backend.service;

import com.koribo_backend.model.Module;
import com.koribo_backend.model.Language;
import com.koribo_backend.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;

    @Autowired
    public ModuleService(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    public List<Module> getAllModules() {
        return moduleRepository.findAll();
    }

    public List<Module> getModulesByLanguage(Language language) {
        return moduleRepository.findByLanguageOrderByOrderIndexAsc(language);
    }

    public Optional<Module> getModuleById(Long id) {
        return moduleRepository.findById(id);
    }

    public Module createModule(Module module) {
        return moduleRepository.save(module);
    }

    public Module updateModule(Long id, Module moduleDetails) {
        Module module = moduleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Module not found with id: " + id));
        
        module.setName(moduleDetails.getName());
        module.setDescription(moduleDetails.getDescription());
        module.setOrderIndex(moduleDetails.getOrderIndex());
        module.setLanguage(moduleDetails.getLanguage());
        
        return moduleRepository.save(module);
    }

    public void deleteModule(Long id) {
        moduleRepository.deleteById(id);
    }
}