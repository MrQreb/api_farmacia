
// async findAll(findDentistasQueryDto: FindDentistasQueryDto) {
//     const { dentista, domicilio, telefono, cedula, creacion , limit = 10, offset = 0 } = findDentistasQueryDto;

//     const queryBuilder = this.dentistaRepository.createQueryBuilder('dentista')
//       .take(limit)
//       .skip(offset)
//       .orderBy('dentista.dentista_nombres', 'ASC')
//       .addOrderBy('dentista.dentista_apellidos', 'ASC');

//     if (dentista) {
//       queryBuilder.andWhere(
//         `CONCAT(dentista.dentista_nombres, ' ', dentista.dentista_apellidos) ILIKE :dentista`,
//         { dentista: `%${dentista}%` }
//       );
//     }

//     if (domicilio) {
//       queryBuilder.andWhere('dentista.dentista_domicilio ILIKE :domicilio', { domicilio: `%${domicilio}%` });
//     }

//     if (telefono) {
//       queryBuilder.andWhere('dentista.dentista_telefono ILIKE :telefono', { telefono: `%${telefono}%` });
//     }

//     if (cedula) {
//       queryBuilder.andWhere('dentista.dentista_cedula ILIKE :cedula', { cedula: `%${cedula}%` });
//     }

//     if (creacion) {
//       queryBuilder.andWhere('CAST(dentista.dentista_creacion AS TEXT) LIKE :creacion', { creacion: `%${creacion}%` });
//     }

//     queryBuilder.andWhere('dentista.dentista_eliminado = :eliminado', { eliminado: false });

//     const dentistas = await queryBuilder.getMany();

//     if (!dentistas || dentistas.length === 0) throw new NotFoundException(`no se encontraron dentistas`);

//     return dentistas.map( (dentista: Dentista)  => ({
//       dentista_id: dentista.dentista_id,
//       dentista_nombre: `${dentista.dentista_nombres} ${dentista.dentista_apellidos}`,
//       dentista_domicilio: dentista.dentista_domicilio,
//       dentista_telefono: dentista.dentista_telefono,
//       dentista_cedula: dentista.dentista_cedula,
//       dentista_creacion: dentista.dentista_creacion,
//     }));
//   }
