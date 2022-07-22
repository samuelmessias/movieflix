package com.devsuperior.movieflix.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.projections.MovieMinProjection;

public interface MovieRepository extends JpaRepository<Movie, Long>{
	
//	@Query("select new com.devsuperior.movieflix.dto.MovieMinDTO(obj.id,obj.title, obj.subTitle, obj.year, obj.imgUrl) "
//			+ "from Movie obj where "
//			+ "obj.genre is null "
//			+ "order by obj.title asc")
	
	@Query(nativeQuery = true, value = "SELECT ID, TITLE, SUB_TITLE SUBTITLE, YEAR, IMG_URL IMGURL FROM TB_MOVIE WHERE 0 =:genere_id OR GENRE_ID = :genere_id ORDER BY TITLE")
	Page<MovieMinProjection> findByGenre(Long genere_id, Pageable pageable);


}
