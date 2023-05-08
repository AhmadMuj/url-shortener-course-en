import httpError from "http-errors";
import knex from "../config/knex";

export const registerVisit = async (url_id: string, ip: string) =>
  knex("visits").insert({ url_id, ip });

export const getLastVisits = async (
  user_id: number,
  limit: number,
  offset: number
) =>
  knex("visits")
    .join("urls", "urls.id", "visits.url_id")
    .select(["urls.id", "urls.url", "visits.ip", "visits.created_at"])
    .where({ user_id })
    .limit(limit || 15)
    .offset(offset || 0)
    .orderBy("visits.created_at", "desc");

export const getVisitsByURL = async (
  url_id: string,
  user_id: number,
  limit: number,
  offset: number
) => {
  const url = await knex("url")
    .where({ id: url_id })
    .select(["user_id"])
    .first();
  if (!url) {
    throw new httpError.NotFound("URL not found");
  }
  if (url.user_id !== user_id) {
    throw new httpError.Unauthorized(
      "You don't have permissions to view this URL"
    );
  }
  return knex("visits")
    .where({ url_id })
    .limit(limit || 15)
    .offset(offset || 0)
    .orderBy("created_at", "desc");
};
