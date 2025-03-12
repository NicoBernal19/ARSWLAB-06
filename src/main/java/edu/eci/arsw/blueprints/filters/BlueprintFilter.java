package edu.eci.arsw.blueprints.filters;

import edu.eci.arsw.blueprints.model.Blueprint;

/**
 * @author Nicolas Bernal
 */
public interface BlueprintFilter {
    Blueprint filter(Blueprint blueprint);
}
