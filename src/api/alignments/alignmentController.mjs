import { StatusCodes } from 'http-status-codes';
import { APIResponse } from '../../commons/utils/response.mjs';
import { handleError } from '../../commons/utils/handleError.mjs';
import {
  createAlignmentRecord,
  listAlignmentsByTechnician,
} from '../../commons/db/alignmentsOps.mjs';
import { TABLES } from '../../commons/constants/common.mjs';
import { ensureTableExists } from '../../commons/db/commonOps.mjs';

export const createAlignment = async (req, res) => {
  try {
    const {
      alignmentId,
      vehicleVin,
      technicianId,
      startTime,
      endTime,
      status,
    } = req.body;

    await ensureTableExists(TABLES.ALIGNMENT);

    const alignment = {
      alignmentId,
      vehicleVin,
      technicianId,
      startTime,
      endTime,
      status,
    };

    const createdAlignment = await createAlignmentRecord(alignment);

    return APIResponse.success(
      res,
      'Alignment session created successfully',
      createdAlignment,
      StatusCodes.CREATED
    );
  } catch (error) {
    handleError(error, res);
  }
};

export const listAlignments = async (req, res) => {
  try {
    const { technicianId } = req.query;

    await ensureTableExists(TABLES.ALIGNMENT);

    const alignments = await listAlignmentsByTechnician(technicianId);

    console.log({ alignments });

    return APIResponse.success(
      res,
      'Alignments retrieved successfully',
      alignments,
      StatusCodes.OK
    );
  } catch (error) {
    handleError(error, res);
  }
};
