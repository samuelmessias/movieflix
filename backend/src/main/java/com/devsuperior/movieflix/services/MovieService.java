package com.devsuperior.movieflix.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.MovieMinDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.projections.MovieMinProjection;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class MovieService {
	
	@Autowired
	private MovieRepository repository;

	
	@Transactional(readOnly = true)
	public MovieDTO findById(Long id){
		Optional<Movie> obj = repository.findById(id);
		Movie entity = obj.orElseThrow(() ->  new ResourceNotFoundException("Entidade não encontrada!"));
		return new MovieDTO(entity);
	}
	
	
	@Transactional(readOnly = true)
	public List<ReviewDTO> findByIdWithReview(Long id) {
		Optional<Movie> obj = repository.findById(id);
		Movie entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entidade não encontrada!"));
		
		List<ReviewDTO> list = new ArrayList<>();
		for(Review r : entity.getReviews()) {
			list.add(new ReviewDTO(r));		}
		
		return list;
	}
	
	
	@Transactional(readOnly = true)
	public Page<MovieMinDTO> findByGenre(Long genreId, Pageable pageable){
		Page<MovieMinProjection> projs = repository.findByGenre(genreId, pageable);
		return projs.map(x -> new MovieMinDTO(x));
	}
}
